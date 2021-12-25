import { useAuthContext } from "contexts/AuthContext";
import { useQuery } from "react-query";
import React from "react";
import { TeachersService } from "services/teachers";
import UserCard, { UserCardStatuses } from "components/UserCard";
import { Grid } from "./styles";

function useTeachersAvailable() {
  const { data, ...rest } = useQuery(
    "teachers-available",
    () => TeachersService.fetchAvailable(),
    { refetchInterval: 3000 }
  );
  return { teachers: data, ...rest };
}

export default function Main() {
  const { user } = useAuthContext();
  const { teachers, isLoading } = useTeachersAvailable();

  return (
    <div data-testid="main-page">
      <p>Welcome {user?.name}</p>
      {isLoading && <span data-testid="loading-indicator">Loading...</span>}
      {!isLoading && (
        <>
          {teachers?.length === 0 ? (
            <span>No momento não tem nenhum professor disponível</span>
          ) : (
            <Grid>
              {teachers?.map((teacher) => (
                <UserCard
                  key={teacher.id}
                  user={teacher}
                  onCallClick={() => {}}
                  status={UserCardStatuses.Online}
                  onProfileClick={() => {}}
                />
              ))}
            </Grid>
          )}
        </>
      )}
    </div>
  );
}
