import {useEffect, useState} from "react";

export function useProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  //empty array in useeffect means run only once
  useEffect(() => {
    setLoading(true);
    fetch('/api/profile').then(response => {
      response.json().then(data => {
        setData(data);
        setLoading(false);
      });
    })
  }, []);

  return {loading, data};
}