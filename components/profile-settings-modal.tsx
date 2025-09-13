"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserProfile } from "@/app/(auth)/actions";

interface ProfileData {
  name: string;
  country: string;
  zipCode: string;
}

interface ProfileSettingsModalProps {
  children: React.ReactNode;
  initialProfile?: ProfileData;
}

export function ProfileSettingsModal({
  children,
  initialProfile,
}: ProfileSettingsModalProps) {
  const { data: session, update: updateSession } = useSession();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState<ProfileData>({
    name: initialProfile?.name || "",
    country: initialProfile?.country || "",
    zipCode: initialProfile?.zipCode || "",
  });

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      toast.error("ユーザー情報が見つかりません");
      return;
    }

    startTransition(async () => {
      try {
        const result = await updateUserProfile({
          userId: session.user.id,
          name: formData.name,
          country: formData.country,
          zipCode: formData.zipCode,
        });

        if (result.status === "success") {
          toast.success("プロフィールが更新されました");
          setOpen(false);
          // セッションを更新してプロフィール情報を反映
          await updateSession();
        } else {
          toast.error("プロフィールの更新に失敗しました");
        }
      } catch (error) {
        console.error("Profile update error:", error);
        toast.error("プロフィールの更新中にエラーが発生しました");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>プロフィール設定</DialogTitle>
          <DialogDescription>
            あなたのプロフィール情報を設定してください。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                名前
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="col-span-3"
                placeholder="山田太郎"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">
                国
              </Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="col-span-3"
                placeholder="日本"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zipCode" className="text-right">
                郵便番号
              </Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className="col-span-3"
                placeholder="123-4567"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "更新中..." : "保存"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
