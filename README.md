In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run server`
#### `Get agents list`
```
GET http://localhost:3001/agents
```

The response of this request would be the json of all agents list.

#### `Get one agent`

```
GET http://localhost:3001/agents/{id}
```

The response of this request would be the json of the agent which match the id.
