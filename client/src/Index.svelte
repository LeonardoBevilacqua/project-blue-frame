<script lang="ts">
    import { Route,Router } from "svelte-navigator";
    import Admin from "./routes/Admin.svelte";
    import App from "./routes/App.svelte";
</script>

<Router primary={false}>
    <Route path="/">
        <App />
    </Route>
    <Route path="admin">
        <Admin />
    </Route>
</Router>
