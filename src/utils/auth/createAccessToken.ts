import { GraphQLClientSingleton } from "../../graphql";
import { customerAccessTokenCreateMutation } from "../../graphql/mutations/customerAccessTokenCreate";
import { cookies } from "next/headers";

export const createAccessToken = async (email: string, password: string) => {
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();

  const {
    customerAccessTokenCreate,
  }: {
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string;
        expiresAt: string;
      };
    };
  } = await graphqlClient.request(customerAccessTokenCreateMutation, {
    email,
    password,
  });

  const { accessToken, expiresAt } =
    customerAccessTokenCreate?.customerAccessToken;

  if (accessToken) {
    const cookiesStore = await cookies();
    cookiesStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(expiresAt),
    });

    return accessToken;
  }

  return null;
};
