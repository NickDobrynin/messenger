import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { v4 as uuid } from 'uuid';
import { Message } from './entities/message.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChatsService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Chat) private chatsRepository: Repository<Chat>,
  ) {}

  async getChatsById(id): Promise<Chat[]> {
    const chats = await this.chatsRepository.find();
    return chats.filter((chat) => chat.members.includes(id));
  }

  async createChat(from, to): Promise<Chat> {
    const userChats = await this.getChatsById(from);
    const user = await this.usersService.getUserById(to);

    if (!user) {
      throw new Error('User not exists!');
    }
    if (userChats.some((chat) => chat.members.includes(to))) {
      throw new Error('Chat already exists!');
    }

    const chat = this.chatsRepository.create({
      id: uuid(),
      messages: [],
      members: [from, to],
    });

    return await this.chatsRepository.save(chat);
  }

  async sendMessage(chatId, from, to, message): Promise<Message> {
    const chat = await this.chatsRepository.findOne({
      where: { id: chatId },
    });

    const newMessage = {
      id: chat.messages.length + 1,
      message,
      from,
      to,
      date: new Date().toISOString(),
    };

    await this.chatsRepository.save({
      ...chat,
      messages: [...chat.messages, newMessage],
    });

    return newMessage;
  }
}
