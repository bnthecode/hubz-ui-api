
export const dbUserToUiUser = (dbUser, token) => ({
    id: dbUser._id,
    token: token,
    username: dbUser.username,
    first_name: dbUser.first_name,
    last_name: dbUser.last_name,
})

export const createdUserToUiUser = (user, token) => ({
    id: user._id,
    token: token,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
})