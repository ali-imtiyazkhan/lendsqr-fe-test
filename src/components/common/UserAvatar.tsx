import { USER_AVATAR_SRC } from "../../constants/assets";

type UserAvatarProps = {
  className?: string;
  alt?: string;
};

export default function UserAvatar({ className, alt = "User avatar" }: UserAvatarProps) {
  return <img className={className} src={USER_AVATAR_SRC} alt={alt} />;
}
