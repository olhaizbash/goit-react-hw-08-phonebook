export const selectIsLoading = state => state.contactDetails.isLoading;
export const selectError = state => state.contactDetails.error;
export const selectUser = state => state.contactDetails.user;
export const selectAuth = state => state.contactDetails.authenticated;
export const selectToken = state => state.contactDetails.token;
export const selectUserName = state => state.contactDetails.user.name;

export const selectId = state => state.contacts.id;
export const selectContactIsLoading = state => state.contacts.isLoading;
export const selectContactsError = state => state.contacts.error;
export const selectContact = state => state.contacts.contacts;
export const selectContactsFilter = state => state.contacts.filter;
