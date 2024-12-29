import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log("Login successfull");
      navigate("/dashboard/home");
    },
  });

  const handleLoginSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    mutation.mutate({ email, password });
  };

  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-1/4 mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Login</CardTitle>
          </CardHeader>
          <div className="mb-5 w-full flex justify-center">
            {mutation.isError && (
              <span className=" text-red-500 text-sm text-center">
                {mutation.error.message}
              </span>
            )}
          </div>
          <CardContent>
            <form onSubmit={handleLoginSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      ref={emailRef}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="Password"
                      ref={passwordRef}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending && (
                      <LoaderCircle className={`animate-spin`} />
                    )}
                    <span>Login</span>
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to={"/auth/register"}
                    className="underline underline-offset-4"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
