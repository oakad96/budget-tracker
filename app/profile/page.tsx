import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle>John Doe</CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">Free Plan</Badge>
              <Badge variant="outline">Member</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <h3 className="font-semibold">Email</h3>
            <p className="text-muted-foreground">john.doe@example.com</p>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold">Member Since</h3>
            <p className="text-muted-foreground">January 2024</p>
          </div>
          <Button className="w-full" variant="outline">
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
