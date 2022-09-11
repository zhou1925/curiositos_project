import React from "react";
import Link from "next/link";
import { DetailsStyle404, GoHome, NotFoundText } from "../styles/NotFoundStyles";

const NotFound = () => {
  return (
    <DetailsStyle404>
        <img src="/images/404.svg" height="550" width="550" alt="404_not_found" />
        <NotFoundText>
        <h1>
            <strong>Oh no!</strong>
        </h1>
        <p>
            La pagina que buscas no existe :(
        </p>
        <GoHome>
            <Link href="/">Vamos a casa</Link>
        </GoHome>
        </NotFoundText>
    </DetailsStyle404>    
  );
};

export default NotFound;