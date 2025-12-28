import { GraphQLClientSingleton } from "../../graphql";
import { customerName } from "../../graphql/queries/customerName";
import { cookies } from "next/headers";

export const validateAccessToken = async () => {
  try {
    const cookieStore = await cookies();
    const accessTokenCookie = cookieStore.get("accessToken");
    const accessToken = accessTokenCookie?.value || "";

    if (!accessToken) return null;

    const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
    const { customer }: { customer: { firstName: string; email: string } } =
      await graphqlClient.request(customerName, {
        customerAccessToken: accessToken,
      });

    return customer;
  } catch (error) {
    console.error(error);
    return null;
  }
};
