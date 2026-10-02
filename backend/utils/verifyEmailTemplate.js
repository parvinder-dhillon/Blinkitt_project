
const verifyEmailTemplate = ({name, url}) => {
    return`
    <p>Dear ${name}</p>
    <p>Thank you for registering Blinkit.</p>
    <a href="${url}" style="color:white; color : blue; margin-top: 5px; padding : 10px; display:inline">
     Verify Email
    </a>
    `

}

export default verifyEmailTemplate