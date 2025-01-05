import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBook, getSingleBook, updateBook } from "@/http/api";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be atleast 2 characters.",
  }),
  genre: z.string().min(2, {
    message: "Genre must be atleast 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be atleast 2 characters.",
  }),
  coverImage: z.instanceof(FileList).refine((file) => {
    return file.length === 1;
  }, "Cover Image is required"),
  file: z.instanceof(FileList).refine((file) => {
    return file.length === 1;
  }, "Book PDF is required"),
});

function UpdateBook() {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      genre: "",
      description: "",
    },
  });

  const coverImageRef = form.register("coverImage");
  const fileRef = form.register("file");

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: getSingleBook,
    onSuccess: (response) => {
      setBookDetails(response.data);
    },
  });

  const mutationUpdateBook = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/dashboard/books");
    },
  });

  useEffect(() => {
    // Fetch book details when bookId changes
    mutation.mutate(bookId);
  }, [bookId]); // Trigger only when bookId changes

  useEffect(() => {
    // Reset form when bookDetails is fetched
    if (bookDetails) {
      form.reset({
        title: bookDetails.title,
        genre: bookDetails.genre,
        description: bookDetails.description,
      });
    }
  }, [bookDetails, form]); // Trigger only when bookDetails changes

  function onSubmit(values) {
    const formdata = new FormData();
    formdata.append("title", values.title);
    formdata.append("genre", values.genre);
    formdata.append("description", values.description);
    formdata.append("coverImage", values.coverImage[0]);
    formdata.append("file", values.file[0]);

    // Pass bookId and updatedData (FormData) to the mutation
    mutationUpdateBook.mutate({ bookId, formdata });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Update</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-3 items-center">
              <Link to={"/dashboard/books"}>
                <Button variant="outline">
                  <span className="ml-2">Cancel</span>
                </Button>
              </Link>
              <Button type="submit" className="w-full flex gap-2" disabled={mutationUpdateBook.isPending}>
                <span>
                  {mutation.isPending && (
                    <LoaderCircle className={`animate-spin`} />
                  )}
                </span>
                <span>Update</span>
              </Button>
            </div>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Update book</CardTitle>
              <CardDescription>
                Fill out the form below to create a new book.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={() => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="w-full"
                          {...coverImageRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel>Book File</FormLabel>
                      <FormControl>
                        <Input type="file" className="w-full" {...fileRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}

export default UpdateBook;
