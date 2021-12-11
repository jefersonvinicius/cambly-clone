import Button from "components/Button";
import { User } from "models/User";
import React from "react";
import {
  AvatarImage,
  BioText,
  Container,
  ImageBox,
  Indicator,
  NameText,
  Header,
  Footer,
  CallButton,
} from "./styles";

export enum UserCardStatuses {
  Online = "online",
  Offline = "offline",
}

export type UserCardProps = {
  user: User;
  status: UserCardStatuses;
  onCallClick: () => void;
  onProfileClick: () => void;
};

export default function UserCard({
  user,
  status,
  onCallClick,
  onProfileClick,
}: UserCardProps) {
  return (
    <Container>
      <Header>
        <ImageBox>
          <AvatarImage
            data-testid="user-image"
            src={user.image}
            alt={`Avatar do ${user.name}`}
          />
          {status === UserCardStatuses.Online && (
            <Indicator
              color="rgb(150, 196, 94)"
              data-testid="online-indicator"
            />
          )}
        </ImageBox>
        <NameText>{user.name}</NameText>
      </Header>
      <div>
        <BioText>{user.bio}</BioText>
      </div>
      <Footer>
        <Button
          onClick={() => onProfileClick()}
          color="#ccc"
          data-testid="profile-button"
        >
          Profile
        </Button>
        {status === UserCardStatuses.Online && (
          <CallButton onClick={() => onCallClick()} data-testid="call-button">
            Call
          </CallButton>
        )}
      </Footer>
    </Container>
  );
}
