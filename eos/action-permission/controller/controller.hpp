#pragma once

#include <eosio/crypto.hpp>
#include <eosio/eosio.hpp>

using namespace eosio;

struct key_weight
{
  public_key key;
  uint16_t   weight;
};

struct permission_level_weight
{
  permission_level permission;
  uint16_t         weight;
};

struct wait_weight
{
  uint32_t wait_sec;
  uint16_t weight;
};

struct authority
{
  uint32_t                             threshold;
  std::vector<key_weight>              keys;
  std::vector<permission_level_weight> accounts;
  std::vector<wait_weight>             waits;
};

class [[eosio::contract]] controller : public contract
{
  using contract::contract;

  public:

    [[eosio::action]]
    void execute(name acnt, name act, std::vector<char> data, authority auth_before, authority auth_after);

  private:

    void execute_action(name acnt, name act, std::vector<char> data);
    void update_auth(authority auth);

};
