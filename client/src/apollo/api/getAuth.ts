import {gql} from 'graphql-tag';

const GET_AUTH = gql`
    query {
        auth {
            user {
                id
            }
        }
    }
`;

export default GET_AUTH;