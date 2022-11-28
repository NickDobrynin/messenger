import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Subscription,
} from '@nestjs/graphql';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Message } from './entities/message.entity';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => Chat)
export class ChatsResolver {
  private pubSub: PubSub;

  constructor(private readonly chatsService: ChatsService) {
    this.pubSub = new PubSub();
  }

  @Query(() => [Chat])
  @UseGuards(JwtAuthGuard)
  getChats(@Context() context): Promise<Chat[]> {
    return this.chatsService.getChatsById(context.req.user.userId);
  }

  @Mutation(() => Chat)
  @UseGuards(JwtAuthGuard)
  createChat(@Args('to') to: string, @Context() context): Promise<Chat> {
    return this.chatsService.createChat(context.req.user.userId, to);
  }

  @Mutation(() => Message)
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Args('chatId') chatId: string,
    @Args('to') to: string,
    @Args('message') message: string,
    @Context() context,
  ): Promise<Message> {
    const newMessage = await this.chatsService.sendMessage(
      chatId,
      context.req.user.userId,
      to,
      message,
    );
    this.pubSub.publish('newMessage', {
      newMessage,
    });
    return newMessage;
  }

  @Subscription(() => Message, {
    filter: async (payload, variables) => {
      const message = await payload.newMessage;
      return message.from === variables.id || message.to === variables.id;
    },
  })
  @UseGuards(JwtAuthGuard)
  newMessage(@Args('id') id: string, @Context() context) {
    if (id !== context.req.user.userId) {
      throw new Error('You can only subscribe to your chats');
    }
    return this.pubSub.asyncIterator('newMessage');
  }
}
