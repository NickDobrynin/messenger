import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInResponse } from './dto/sign-in-response';
import { SignInInput } from './dto/sign-in.input';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { SignUpInput } from './dto/sign-up.input';
import { SignUpResponse } from './dto/sign-up-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignInResponse)
  @UseGuards(LocalAuthGuard)
  signIn(@Args('signInInput') signInInput: SignInInput, @Context() context) {
    return this.authService.login(context.user);
  }

  @Mutation(() => SignUpResponse)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.register(signUpInput);
  }
}
