#!/bin/bash

npx mikro-orm migration:up
node dist/main.js
