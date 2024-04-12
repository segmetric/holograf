# Hologram

Hologram is a full-stack isomorphic Elixir web framework that can be used on top of Phoenix.

## Inspired by

Hologram was inspired by Elm, Phoenix LiveView, Surface, Svelte, Vue.js and Ruby on Rails.

## How it works

Hologram simplifies web app development by breaking it down into basic building blocks: Layouts, Pages, and Components.

Hologram analyzes the content of your Pages, which need to follow certain conventions. Based on this analysis, it decides which code should run on the client (in the web browser) and which should run on the server. Then, it converts the client-side code into JavaScript.

Keeping the state (data) on the client side makes the programming model simpler. With stateless or stateful components, the app becomes more scalable.

In Hologram, code meant for the client is organized into "actions," while code meant for the server is organized into "commands." Actions can trigger commands, and vice versa. Both actions and commands can be directly triggered by user interactions with the web page.

For communication between the client and server, Hologram uses WebSockets. No additional boilerplate code is necessary - Hologram handles the setup automatically.

## I want to see some code!

To understand the structure of a Hologram app and view some actual code, take a look at the feature tests app: [hologram/test/features](https://github.com/bartblast/hologram/tree/master/test/features)

## Basic example

```elixir
defmodule MyPage do
  use Hologram.Page

  route "/my-page-path"
    
  def init(_params, component, _server) do
    put_state(component, :count, 0)
  end

  def template do
    ~H"""
    <div>Count is {@count}</div>
    <button $click={:increment, by: 3}>Increment by</button>
    <Link to={MyOtherPage}>Go to other page</Link>
    """
  end

  def action(:increment, params, component) do
    put_state(component, component.state.count + params.by)
  end

  def command(:save_record, params, server) do
    # Do something on the server, e.g. save a record to the database
  end
end
```

## Selling Points

* State stays on the client - solving various problems as outlined below:

* No latency issues as most of the code runs immediately on the client. This enables the creation of rich UIs or even games. Currently, with LiveView, you require something like Fly.io to make it bearable, but latency persists and response time cannot be guaranteed (as there is always some variance). Additionally, some JS or Alpine is still necessary to ensure functionality. Until someone devises a solution like quantum internet (utilizing entanglement), there are no workarounds for this issue. Unsure if this is technically feasible, though :wink:

* Enhanced offline support, addressing scenarios such as internet disconnection or poor signal. With the bulk of code executed on the client, Hologram functions offline for extended periods. This facilitates the development of Progressive Web Apps (PWAs) or mobile apps via WebView, particularly when incorporating mechanisms like LocalStorage.

* Reduced server RAM usage as the state resides in the browser.

* Lower CPU utilization since the browser handles most code execution, alleviating server workload.

* Decreased bandwidth consumption, as only commands necessitate communication with the server, eliminating the need to transmit component diffs for re-rendering.

* Elimination of state synchronization issues, with the state centralized in the browser and WebSocket communication remaining stateless.

* Minimal reliance on JS except for interfacing with select third-party scripts or widgets. This can be mitigated through standardized libraries tailored to popular packages, streamlining interoperability.

* Particularly welcoming to new Elixir converts or novice developers, prioritizing intuitive usability to streamline feature development without excessive technical troubleshooting or writing boilerplate code.

## Features

Please note that the "Readme" file is currently undergoing an overhaul, and the "Features" section may not be up to date.

### Elixir Syntax

#### Operators

##### Overridable General Operators

| Operator | Status             |
| :------- | :----------------: |
| unary +  | :white_check_mark: |
| unary -  | :white_check_mark: |
| +        | :white_check_mark: |
| -        | :white_check_mark: |
| *        | :white_check_mark: |
| /        | :white_check_mark: |
| ++       | :white_check_mark: |
| --       | :white_check_mark: |
| and      | :white_check_mark: |
| &&       | :white_check_mark: |
| or       | :white_check_mark: |
| \|\|     | :white_check_mark: |
| not      | :white_check_mark: |
| !        | :white_check_mark: |
| in       | :white_check_mark: |
| not in   | :white_check_mark: |
| @        | :white_check_mark: |
| ..       | :white_check_mark: |

#### Other

| Feature                        | Status             |
| :----------------------------- | :----------------: |
| Regular expressions            | :x:                |