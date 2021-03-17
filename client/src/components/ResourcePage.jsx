import React, { useState, useEffect } from "react";
import axios from "axios";
import Resource from "./Resource/Resource";

export default function ResourcePage() {
  const [resource, setResource] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = window.location.href.split("/");
    const resourceId = url[url.length - 1];
    axios
      .get(`/resources/resource/${resourceId}`)
      .then((res) => {
        setResource(res.data);
        setLoading(false);
        console.log("response", res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return <div>{!loading && <Resource data={resource} />}</div>;
}
