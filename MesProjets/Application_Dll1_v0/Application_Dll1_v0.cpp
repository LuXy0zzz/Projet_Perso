#include "pch.h"
#include "Application_Dll1_v0.h"

BAKKESMOD_PLUGIN(Application_Dll1_v0, "Auto Training Plugin", "1.0", PERMISSION_ALL)

void Application_Dll1_v0::onLoad() 
{
	this->Log("This is my frisr BakkesMod Plugin !! @luxy0");

	this->LoadHooks();
}

void Application_Dll1_v0::onUnLoad()
{

}

void Application_Dll1_v0::LoadHooks()
{
	gameWrapper->HookEvent("Function TAGame.GameEvent_Soccar_TA.EventMatchEnded", std::bind(&Application_Dll1_v0::GameEndedEvent, this, std::placeholders::_1));
	gameWrapper->HookEvent("Function TAGame.AchievementManager_TA.HandleMatchEnded", std::bind(&Application_Dll1_v0::GameEndedEvent, this, std::placeholders::_1));


}

void Application_Dll1_v0::GameEndedEvent(std::string name)
{
	cvarManager->executeCommand("load_freeplay");

}

void Application_Dll1_v0::Log(std::string msg)
{
	cvarManager->log(msg);
}
// mettre ensuite le dll dans : C:\Users\joanp\AppData\Roaming\bakkesmod\bakkesmod\plugins
// tuto : https://www.youtube.com/watch?v=N1uUxhU6AgY