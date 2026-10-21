export enum MessageField {
  Email = "email",
  Subject = "subject",
  Message = "message",
}

export const messageDefaultValues = {
  [MessageField.Email]: "",
  [MessageField.Subject]: "",
  [MessageField.Message]: "",
};