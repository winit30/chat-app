import { Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  textMessage: z
    .string()
    .max(500, {
      message: "Message must not be longer than 500 characters.",
    })
    .optional(),
});

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import type { Drafts, Draft, User } from "@/store/userSlice";

type ChatPropTypes = {
  sendMessage: (content: string) => void;
  updateDraftForActiveUser: (d: Draft) => void;
  user: User;
  drafts: Drafts;
};

export default function ChatForm({
  sendMessage,
  updateDraftForActiveUser,
  user,
  drafts,
}: ChatPropTypes) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data?.textMessage) {
      sendMessage(data.textMessage);
      updateDraftForActiveUser({ id: user.id, message: "" });
    }

    form.reset({
      textMessage: "",
    });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      form.handleSubmit(onSubmit)();
    }
  };

  function handleFormInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    updateDraftForActiveUser({ id: user.id, message: e.target.value });
  }

  useEffect(() => {
    if (drafts[user?.id]) {
      form.reset({
        textMessage: drafts[user?.id],
      });
    } else {
      form.reset({
        textMessage: "",
      });
    }
  }, [user, drafts, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 bg-slate-100 flex items-end gap-2"
      >
        <FormField
          control={form.control}
          name="textMessage"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormMessage />
              <FormControl>
                <Textarea
                  placeholder="Type a message"
                  className="resize-none min-h-1 bg-white border-slate-400"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFormInputChange(e);
                  }}
                  rows={1}
                  onKeyDown={handleKeyDown}
                  required={false}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          <Send />
        </Button>
      </form>
    </Form>
  );
}
