import React from "react";
import { useParams, withRouter } from "react-router-dom";

import { Jumbotron, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

function ProfileComponent(props) {
  const { id } = useParams();

  const handleOnClick = (event) => {
    event.preventDefault();
    toast.success("Notif déclenchée !");
  };

  return (
    <>
      <Jumbotron>
        <h1>Mon profile</h1>
        <p>
          {id
            ? `Bienvenu utilisateur numero ${id}`
            : `Connectez vous pour voir votre profile`}
        </p>
        <p>
          <Button variant="success" onClick={handleOnClick}>
            Declencher une notif
          </Button>
        </p>
      </Jumbotron>
    </>
  );
}

const Profile = withRouter(ProfileComponent);

export default Profile;
