@echo off
setlocal
setlocal enabledelayedexpansion

:: ------------------- declare CLI file variable -------------------
@rem retrieve project name
@rem Ref : https://www.robvanderwoude.com/ntfor.php
@rem Directory = %~dp0
@rem Object Name With Quotations=%0
@rem Object Name Without Quotes=%~0
@rem Bat File Drive = %~d0
@rem Full File Name = %~n0%~x0
@rem File Name Without Extension = %~n0
@rem File Extension = %~x0

set CLI_DIRECTORY=%~dp0
set CLI_FILE=%~n0%~x0
set CLI_FILENAME=%~n0
set CLI_FILEEXTENSION=%~x0

:: ------------------- declare CLI variable -------------------

set BREADCRUMB=cli
set COMMAND=
set COMMAND_BC_AGRS=
set COMMAND_AC_AGRS=

:: ------------------- declare variable -------------------

for %%a in ("%cd%") do (
    set PROJECT_NAME=%%~na
)
set PROJECT_ENV=dev

@rem build docker image
cd %CLI_DIRECTORY%
docker build --rm -t json-server:%PROJECT_NAME% .\conf\docker\json-server

@rem create cache
IF NOT EXIST cache\nodejs (
    mkdir cache\nodejs
)

echo ^> Startup docker container instance and execute crawler
docker rm -f json-service_%PROJECT_NAME%
docker run -d --rm^
    -p 3000:3000 ^
    --name json-service_%PROJECT_NAME% ^
    json-server:%PROJECT_NAME% bash -l -c "json-server -H 0.0.0.0 db.json"
