
const {
    REACT_APP_CLIEN_ID,
    REACT_APP_PROJECT_ID,
    REACT_APP_CLIENT_SECRET

} = process.env

console.log(REACT_APP_CLIEN_ID);

export const client_secret_google = {
    client_id: REACT_APP_CLIEN_ID,
    project_id: REACT_APP_PROJECT_ID,
    client_secret: REACT_APP_CLIENT_SECRET
}