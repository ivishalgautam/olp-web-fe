"use client";
import { MainContext } from "@/store/context";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { H4 } from "../ui/typography";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import { FaRegEye } from "react-icons/fa";

const changePassword = async (data) => {
  return await http().post(
    `${endpoints.users.getAll}/${data.id}/change-password`,
    data,
  );
};

export default function ChangePasswordForm() {
  const [birthDate, setBirthDate] = useState();
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    npassword: false,
    cpassword: false,
  });
  const { user } = useContext(MainContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const createMutation = useMutation(changePassword, {
    onSuccess: () => {
      toast.success("Password changed");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      id: user?.id,
      old_password: data.password,
      new_password: data.npassword,
    };

    handleUpdate(payload);
  };

  function handleUpdate(data) {
    createMutation.mutate(data);
  }

  useEffect(() => {
    setBirthDate(new Date(user?.birth_date));
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 rounded-lg border p-4">
        <H4>Change password</H4>

        <div className="space-y-2">
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                type={showPasswords.password ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "required",
                })}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
              >
                <FaRegEye />
              </div>
            </div>
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>

          {/* new password */}
          <div className="relative">
            <Label htmlFor="npassword">New password</Label>
            <div className="relative">
              <Input
                type={showPasswords.npassword ? "text" : "password"}
                placeholder="New password"
                {...register("npassword", {
                  required: "required",
                })}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    npassword: !showPasswords.npassword,
                  }))
                }
              >
                <FaRegEye />
              </div>
            </div>
            {errors.npassword && (
              <span className="text-red-600">{errors.npassword.message}</span>
            )}
          </div>

          {/* confirm password */}
          <div className="relative">
            <Label htmlFor="cpassword">Confirm password</Label>
            <div className="relative">
              <Input
                type={showPasswords.cpassword ? "text" : "password"}
                placeholder="Confirm password"
                {...register("cpassword", {
                  required: "required",
                  validate: (val) => {
                    if (watch("npassword") != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    cpassword: !showPasswords.cpassword,
                  }))
                }
              >
                <FaRegEye />
              </div>
            </div>
            {errors.cpassword && (
              <span className="text-red-600">{errors.cpassword.message}</span>
            )}
          </div>
        </div>

        {/* button */}
        <Button>Change password</Button>
      </div>
    </form>
  );
}
