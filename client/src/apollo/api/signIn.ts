import {gql} from 'graphql-tag';

const SIGN_IN = gql`
    mutation signIn($user: SignInInput!) {
        signIn(signInInput: $user) {
            access_token
        }
    }
`;

export default SIGN_IN;