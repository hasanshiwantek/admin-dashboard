import { ActionEnums } from "@/const/appConstants";
import { EmailTemplate } from "./types";

export const emailTemplatesData: EmailTemplate[] = [
  {
    id: "1",
    title: "Account Settings Edited",
    description: "Sent when a customer or store admin edits account settings",
    enabled: true,
  },
  {
    id: "2",
    title: "Password Reset",
    description:
      "Sent when a customer account password is reset on the customer details page or by the customer",
    enabled: false,
  },
  {
    id: "3",
    title: "Order Status Update",
    description: "Sent when the status of an an order is changed",
    enabled: true,
  },
  {
    id: "4",
    title: "Order Email",
    description: "Sent when an order is created",
    enabled: true,
  },
  {
    id: "5",
    title: "Guest Account Created",
    description:
      "Sent when a customer or store admin creates their account as a guest",
    enabled: true,
  },
  {
    id: "6",
    title: "Gift Certificate Recipient",
    description: "Sent to the recipient of a gift certificate",
    enabled: true,
  },
  {
    id: "7",
    title: "Sign-in Link Request",
    description:
      "Sent when an existing customer requests to use passwordless login while checking out",
    enabled: true,
  },
  {
    id: "8",
    title: "Order Notification",
    description:
      "The customer receives this when the store admin sends them an order message",
    enabled: true,
  },
  {
    id: "9",
    title: "Product Review Request",
    description:
      "Sent to customer after purchasing a product to request a review",
    enabled: true,
  },
  {
    id: "10",
    title: "Return Requested",
    description: "Sent to customer after a return has been requested",
    enabled: true,
  },
];

export enum ChannelType {
  Global = "global",
  Channel1 = "channel1",
  Channel2 = "channel2",
}

export const ChannelOptions = [
  { value: ChannelType.Global, label: "Global (storefront defaults)" },
  { value: ChannelType.Channel1, label: "Channel 1" },
  { value: ChannelType.Channel2, label: "Channel 2" },
];

export const getTemplateActions = (enabled: boolean) => [
  { type: ActionEnums.EDIT, label: "Edit Template" },
  {
    type: ActionEnums.TOGGLE,
    label: enabled ? "Disable" : "Enable",
  },
];