import { models } from "mongoose";
import { connect } from "../../models";

const { BONUS_POINT = 10 } = process.env;

export async function getServerSideProps(context) {
  await connect();
  const { id: referal_id } = context.query;

  // get referal data
  const data = await models.ListReferalLink
    .findOne({
      referal_id,
    });

  // referal data not found
  if (!data) return { notFound: true }

  // get invitation data
  const invitation_data = await models.InvitationList
    .findOne({
      referalId: data._id,
    });

  // invitation data not found
  if (!invitation_data) return { notFound: true }

  // update status invitation if not readed
  if (invitation_data.status_invitation == 0) {
    // add point to user who invite
    await models.User
      .updateOne({
        _id: data.userId,
      }, {
        $inc: {
          total_point: BONUS_POINT,
        }
      });

    // set invitation status to read
    await models.InvitationList
      .updateOne({
        referalId: data._id,
      }, {
        status_invitation: 1,
      });
  }

  return {
    redirect: {
      destination: 'https://ourklyk.com/signup',
      permanent: false,
    },
  }
}

export default function Register() {
  return <></>;
}