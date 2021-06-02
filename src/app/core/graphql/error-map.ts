export const errorMap = new Map<string, string>([
  ['DEFAULT', 'Something went wrong!'],
  ['NETWORK_ERROR', 'Could not reach server. Please check your internet connection and try again!'],
  ['INVALID_REFRESH_TOKEN', `We were not able to authenticate you. Please log in again!`],
  ['INVALID_ACCESS_TOKEN', `We were not able to authenticate you. Please log in again!`],
  [
    'INVALID_EMAIL_CONFIRMATION_TOKEN',
    `This email confirmation link is either invalid or expired. Please request a new one!`,
  ],
])
