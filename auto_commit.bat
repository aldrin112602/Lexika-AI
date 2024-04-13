@echo off
:loop

git status --porcelain > temp.txt
set /p changes=<temp.txt
if not defined changes goto pause

git add .
git commit -a -m "Changes: %changes%"

git push

:pause
echo.
echo Press Enter to commit and push again, or any other key to exit.
pause > nul
if errorlevel 1 goto :eof

goto loop

:eof
del temp.txt