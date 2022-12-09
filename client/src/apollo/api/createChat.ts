import {gql} from 'graphql-tag';

const CREATE_CHAT = gql`
    mutation createChat($to: String!) {
        createChat(to: $to) {
            id
            members
            messages {
                id
                date
                from
                message
            }
        }
    }
`;

export default CREATE_CHAT;