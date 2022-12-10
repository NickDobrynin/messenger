import {gql} from 'graphql-tag';

const SUBSCRIBE_CHATS = gql`
    subscription subscribeChats($username: String!) {
        subscribeChats(username: $username) {
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

export default SUBSCRIBE_CHATS;