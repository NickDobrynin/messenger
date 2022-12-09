import {gql} from 'graphql-tag';

const SIGN_UP = gql`
    mutation signUp($user: SignUpInput!) {
        signUp(signUpInput: $user) {
            access_token
        }
    }
`;

export default SIGN_UP;