#include <eosio/asset.hpp>
#include <eosio/crypto.hpp>
#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] test : public contract
{
  public:

    using contract::contract;

    [[eosio::action]]
    void serialize(
      const name&        n,
      const asset&       a,
      const uint64_t     i,
      const std::string& s,
      const bool         b
    ) {
      size_t size = 0;
      size += pack_size(n);
      size += pack_size(a);
      size += pack_size(i);
      size += pack_size(s);
      size += pack_size(b);

      std::vector<char> buf;
      buf.resize(size);

      datastream<char*> ds(buf.data(), buf.size());
      ds << n << a << i << s << b;

      checksum256 hashed = sha256(buf.data(), buf.size());
      printhex(&hashed, 32);
    };
};
