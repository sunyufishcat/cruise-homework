In the project directory, you need to run:

## `npm start` and `npm run server`


###for `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

###for `npm run server`
You can get all agents through:
```
GET http://localhost:3001/agents
```

The response of this request would be the json of all agents list.

You can get one agent through agentId

```
GET http://localhost:3001/agents/{agentId}
```

The response of this request would be the json of the agent which match the id.
