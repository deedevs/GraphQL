const endpointURL = "http://localhost:9000/graphql";

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(endpointURL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });
  const responseBody = await response.json();
  return responseBody.data;
}

export async function loadJob(id) {
  const query = `query JobQuery($id:ID!){
        job(id: $id){
          id
          title
          company{
            id
            name
          }
          description
        }
      }`;
  const data = await graphqlRequest(query, { id });
  return data.job;
}

export async function loadJobs() {
  const query = `{
        jobs {
          id
          title
          company {
            id
            name
          }
        }
      }
      
      `;
  const data = await graphqlRequest(query);
  return data.jobs;
}
