#include "controller.hpp"

using namespace eosio;

void controller::execute(name acnt, name act, std::vector<char> data, authority auth_before, authority auth_after)
{
  require_auth(_self);
  update_auth(auth_before);
  execute_action(acnt, act, data);
  update_auth(auth_after);
}

void controller::execute_action(name acnt, name act, std::vector<char> data)
{
  action a = action();
  a.authorization.push_back(permission_level{_self, name("active")});
  a.account = acnt;
  a.name    = act;
  a.data    = data;
  a.send();
}

void controller::update_auth(authority auth)
{
  action(
    permission_level{_self, name("active")},
    name("eosio"),
    name("updateauth"),
    std::make_tuple(_self, name("active"), name("owner"), auth)
  ).send();
}
