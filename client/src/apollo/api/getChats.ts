import {gql} from 'graphql-tag';

const GET_CHATS = gql`
    query {
        getChats {
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

export default GET_CHATS;