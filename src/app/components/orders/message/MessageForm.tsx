"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useParams } from "next/navigation";

import Form from "@/components/form/Form";
import InputField from "@/components/form/InputField";
import PageLayout from "@/components/ui/PageLayout";
import PageTitle from "@/components/ui/PageTitle";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  getCustomerDetailById,
  getMessageById,
  sendOrderMessage,
  updateMessage,
} from "@/redux/slices/orderMessageSlice";
import { MessageSchema } from "@/validations/formValidations";
import { MessageFormValues } from "./helper/type";
import { MessageField, messageDefaultValues } from "./helper/constant";
import {
  transformGetMessagePayload,
  transformPostMessagePayload,
} from "./helper/utils";
import { errorMessage } from "@/utils/message";

const MessageForm = () => {
  const params = useParams();
  const orderId = params?.orderId as string;
  const messageId = params?.messageId as string;
  const isEdit = !!messageId;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { message, messageLoading, customerDetail, customerLoading } =
    useAppSelector((state: any) => state.orderMessage);

  const form = useForm<MessageFormValues>({
    resolver: yupResolver(MessageSchema),
    defaultValues: messageDefaultValues,
  });

  const { control, reset } = form;
  const LIST_PATH = `/manage/orders/message/${orderId}`;

  // Fetch data
  useEffect(() => {
    if (isEdit && messageId) {
      dispatch(getMessageById({ id: messageId }));
    } else if (orderId) {
      dispatch(getCustomerDetailById({ id: orderId }));
    }
  }, [isEdit, messageId, orderId, dispatch]);

  // Reset form
  useEffect(() => {
    if (isEdit) {
      const data = message?.data ?? message;
      if (data && String(data?.id) === String(messageId)) {
        reset(transformGetMessagePayload(data));
      }
    } else if (customerDetail?.email) {
      reset({
        ...messageDefaultValues,
        [MessageField.Email]: customerDetail?.email,
      });
    }
  }, [isEdit, message, messageId, customerDetail?.email, reset]);

  const onSubmit = async (values: MessageFormValues) => {
    const base = transformPostMessagePayload(values);

    const result = isEdit
      ? await dispatch(
          updateMessage({
            id: messageId,
            data: { ...base, is_read: true },
          }),
        )
      : await dispatch(
          sendOrderMessage({
            data: { order_id: Number(orderId), ...base },
          }),
        );

    const action = isEdit ? updateMessage : sendOrderMessage;
    if (action.rejected.match(result)) {
      errorMessage(
        (result.payload as string) ||
          `Failed to ${isEdit ? "update" : "send"} message`,
      );
      return;
    }

    router.push(LIST_PATH);
  };

  const loading = isEdit ? messageLoading : customerLoading;

  return (
    <PageLayout>
      <PageTitle
        title={isEdit ? "Edit Message" : "Send a Message"}
        description={
          isEdit
            ? "Edit the details of the message below. When you click 'Save' the message will not be re-emailed to the customer, but is still visible from their account."
            : "Enter the message to send to the customer below. An email will be sent to them containing the message and a link to reply."
        }
        hideActionButton
      />

      <Form
        form={form}
        onSubmit={onSubmit}
        footer={{
          submitText: "Save",
          onCancel: () => router.push(LIST_PATH),
          loading: form.formState.isSubmitting,
          disabled: loading,
        }}
      >
        <InputField
          name={MessageField.Email}
          label="From"
          control={control}
          disabled
        />

        <InputField
          name={MessageField.Subject}
          label="Subject"
          required
          control={control}
        />

        <InputField
          name={MessageField.Message}
          label="Message"
          required
          control={control}
          isTextArea
          controlClassName="max-w-md"
        />
      </Form>
    </PageLayout>
  );
};

export default MessageForm;
