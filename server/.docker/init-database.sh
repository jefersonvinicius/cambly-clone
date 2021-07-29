#!/bin/bash

psql -U postgres -c "CREATE DATABASE cambly_clone"
psql -U postgres -c "CREATE DATABASE cambly_clone_test"