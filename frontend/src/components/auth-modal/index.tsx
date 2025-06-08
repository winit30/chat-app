import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.jpg";

const FormSchema = z.object({
  username: z
    .string({ message: "Name is required to join the chat" })
    .min(4, { message: "Name must not be shorter than 4 characters." })
    .max(50, {
      message: "Name must not be longer than 50 characters.",
    }),
  email: z.string({ message: "Email is required to join the chat" }).email({
    message: "Email must be a valid email address",
  }),
});

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { LoginArgTypes } from "@/hooks/useChatAuth";

type AuthModalPropTypes = {
  onChatLogin: ({ payload }: LoginArgTypes) => void;
  open: boolean;
};

export default function AuthModal({ onChatLogin, open }: AuthModalPropTypes) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onChatLogin({
      payload: {
        name: data.username,
        email: data.email,
        image: "https://i.pravatar.cc/300?img=",
      },
    });
  }

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <div className="flex flex-col items-center justify-center">
            <img src={logo} className="w-[150px]" />
            <h2 className="font-black text-3xl my-4">CHAT APP</h2>
          </div>
          <DialogTitle className="text-center">
            Real-time conversations. Effortless connections.
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter your name and email to start chatting. No hassle — just type
            and connect.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 bg-slate-100 flex flex-col items-end gap-2 rounded-md mt-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="Type your name"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="Type your email"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Join Chat</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
