import UserForm from "./components/user-form";

interface User {
  id: number;
  name: string;
  email: string;
}

interface EditUserProps {
  user: User;
}

export default function EditUser({ user }: EditUserProps) {
  return <UserForm user={user} />;
}
