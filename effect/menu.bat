@ECHO OFF

rem ==========================================================================
rem Dont call this script direct, but from main script with the name `run.bat`
rem Ref : http://www.dostips.com/DtTipsMenu.php
rem ==========================================================================

REM.-- Prepare the Command Processor
SETLOCAL ENABLEEXTENSIONS
SETLOCAL ENABLEDELAYEDEXPANSION

:menuLOOP
echo.
echo.= Menu =================================================
echo.
for /f "tokens=1,2,* delims=_ " %%A in ('"findstr /b /c:":menu_" "%~f0""') do echo.  %%B  %%C
set choice=
echo.&set /p choice=Make a choice or hit ENTER to quit: ||GOTO:EOF
echo.&call:menu_%choice%
GOTO:menuLOOP

::-----------------------------------------------------------
:: menu functions follow below here
::-----------------------------------------------------------

:menu_1   bubble
spp.exe sample\tutorial\effect\bubble\start.js
cls
GOTO:EOF
:menu_2   emitstart
spp.exe sample\tutorial\effect\emitstart\start.js
cls
GOTO:EOF
:menu_3   fire
spp.exe sample\tutorial\effect\fire\start.js
cls
GOTO:EOF
:menu_4   fount
spp.exe sample\tutorial\effect\fount\start.js
cls
GOTO:EOF
:menu_5   hexagon
spp.exe sample\tutorial\effect\hexagon\start.js
cls
GOTO:EOF
:menu_6   portalzoom
spp.exe sample\tutorial\effect\portalzoom\start.js
cls
GOTO:EOF
:menu_7   snow
spp.exe sample\tutorial\effect\snow\start.js
cls
GOTO:EOF
:menu_8   spiral
spp.exe sample\tutorial\effect\spiral\start.js
cls
GOTO:EOF
:menu_9   stellar
spp.exe sample\tutorial\effect\stellar\start.js
cls
GOTO:EOF

@rem  :menu_
@rem  
@rem  :menu_T   Tip
@rem  echo.It's easy to add a line separator using one or more fake labels
@rem  cls
@rem  GOTO:EOF
@rem  
@rem  :menu_C   Clear Screen
@rem  cls