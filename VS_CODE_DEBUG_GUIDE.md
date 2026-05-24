# VS Code Debugging Guide

This guide explains how to use the VS Code "Run and Debug" panel to debug your blog application.

## Setup

1. **Install VS Code** - Make sure you have VS Code installed
2. **Install Node.js Extension** - Install the official "JavaScript and TypeScript Nightly" extension from Microsoft
3. **Environment File** - Create `.env.development` based on `.env.debug.example`

## Debug Configurations

I've created multiple debug configurations in `.vscode/launch.json`:

### 1. Debug Blog App (Basic)
- **Purpose**: Standard debugging of the main application
- **Features**: Breakpoints, variable inspection, call stack
- **Use Case**: General debugging and development

### 2. Debug with Nodemon
- **Purpose**: Debug with auto-restart on file changes
- **Features**: Hot reload + debugging capabilities
- **Use Case**: Active development with debugging

### 3. Attach to Running Process
- **Purpose**: Connect to an already running Node.js process
- **Features**: Debug without restarting the server
- **Use Case**: Debugging production or staging environments

### 4. Debug Specific Module
- **Purpose**: Focus debugging on specific parts of the code
- **Features**: Skips node internals and node_modules
- **Use Case**: Deep debugging of application code

### 5. Debug Auth Module
- **Purpose**: Specialized debugging for authentication
- **Features**: Auth-specific debug logging enabled
- **Use Case**: Debugging login/registration issues

### 6. Debug Database Operations
- **Purpose**: Focus on database operations
- **Features**: Database query logging enabled
- **Use Case**: Debugging database performance and errors

## How to Use

### Method 1: Using the Debug Panel
1. Open VS Code
2. Press `Ctrl+Shift+D` (or click the Run and Debug icon in the sidebar)
3. Select a debug configuration from the dropdown
4. Click the green play button or press `F5`

### Method 2: Using Command Palette
1. Press `Ctrl+Shift+P`
2. Type "Debug: Select and Start Debugging"
3. Choose your configuration

### Method 3: Using NPM Scripts
```bash
# Start with debugging enabled
npm run debug

# Start with nodemon and debugging
npm run debug:nodemon

# Start with breakpoint at the beginning
npm run debug:break
```

## Debugging Features

### Breakpoints
- **Set breakpoints**: Click in the gutter next to line numbers
- **Conditional breakpoints**: Right-click → "Edit Breakpoint" → Add condition
- **Log points**: Right-click → "Edit Breakpoint" → Add log message

### Variable Inspection
- **Hover**: Hover over variables to see their current values
- **Watch Panel**: Add variables to watch for continuous monitoring
- **Variables Panel**: View all variables in current scope

### Call Stack
- **Navigate**: Click on stack frames to navigate the call hierarchy
- **Jump to code**: Double-click stack items to jump to that code location

### Debug Console
- **Execute code**: Run JavaScript in the current context
- **Inspect objects**: Type variable names to see their values
- **Call functions**: Execute functions in the current scope

## Common Debugging Scenarios

### Debugging API Requests
1. Set breakpoints in your controller methods
2. Use Postman or browser to make requests
3. Inspect `req` and `res` objects
4. Step through the request handling

### Debugging Database Issues
1. Use the "Debug Database Operations" configuration
2. Set breakpoints in your service methods
3. Inspect query objects and results
4. Check Mongoose connection state

### Debugging Authentication
1. Use the "Debug Auth Module" configuration
2. Set breakpoints in auth middleware
3. Inspect JWT tokens and user objects
4. Test different authentication scenarios

### Debugging Performance Issues
1. Use the Performance Monitor configuration
2. Set breakpoints in slow areas
3. Use the Debug Console to measure execution time
4. Check memory usage in the Variables panel

## Tasks Integration

I've also created debug tasks in `.vscode/tasks.json`:

### Available Tasks
- **Start Debug Server**: Start server with debugging enabled
- **Start with Nodemon Debug**: Start with auto-reload and debugging
- **Kill Node Processes**: Stop all running Node processes
- **Check Debug Port**: Verify debug port availability

### Using Tasks
1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select the desired task

## Tips and Tricks

### Breakpoint Strategies
- Set breakpoints at the beginning of functions
- Use conditional breakpoints for specific conditions
- Use log points for non-breaking debugging

### Performance Debugging
- Use the "Performance" tab to analyze CPU usage
- Check memory usage in the Variables panel
- Use `console.time()` and `console.timeEnd()` for timing

### Error Debugging
- Set breakpoints in error handlers
- Inspect error objects in the Variables panel
- Use the Debug Console to test error scenarios

### Hot Reload with Nodemon
- Use the "Debug with Nodemon" configuration
- Make changes while debugging
- Breakpoints persist across restarts

## Troubleshooting

### Port Already in Use
- Run the "Kill Node Processes" task
- Or manually: `taskkill /F /IM node.exe` (Windows)
- Check port usage: `netstat -ano | findstr :9229`

### Breakpoints Not Working
- Ensure source maps are enabled
- Check that files are not in `node_modules`
- Verify the correct configuration is selected

### Connection Issues
- Check that `.env.development` exists
- Verify environment variables are correct
- Ensure database is running

### VS Code Extensions
- Install "JavaScript and TypeScript Nightly"
- Install "Node.js Extension Pack"
- Install "GitLens" for better code navigation

## Advanced Features

### Remote Debugging
- Use the "Attach to Running Process" configuration
- Configure port forwarding if needed
- Works with Docker and remote servers

### Multi-target Debugging
- Debug multiple processes simultaneously
- Use compound configurations in `launch.json`
- Switch between debug sessions

### Custom Launch Configurations
- Edit `.vscode/launch.json` to add custom configurations
- Add environment variables specific to your needs
- Configure custom runtime arguments

## Environment Variables for Debugging

Add these to your `.env.development` for enhanced debugging:

```bash
# Enable all debug features
DEBUG_ENABLED=true
DEBUG_LOG_LEVEL=debug

# Request debugging
DEBUG_LOG_HEADERS=true
DEBUG_LOG_BODY=true
DEBUG_LOG_RESPONSE=true

# Database debugging
DEBUG_DB_QUERIES=true
DEBUG_DB_ERRORS=true

# Performance debugging
DEBUG_MEMORY=true
DEBUG_CPU=true
```

Now you can effectively debug your blog application using VS Code's powerful debugging tools!
