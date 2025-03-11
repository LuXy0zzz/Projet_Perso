#pragma once

#include "bakkesmod/plugin/bakkesmodplugin.h"

#pragma comment( lib, "pluginsdk.lib" )

class Application_Dll1_v0 : public BakkesMod::Plugin::BakkesModPlugin
{
public :
	virtual void onLoad();
	virtual void onUnLoad();

	void LoadHooks();
	void GameEndedEvent(std::string name);

private:
	void Log(std::string msg);
};

