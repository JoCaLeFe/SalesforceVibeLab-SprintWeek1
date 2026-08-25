public with sharing class AccountController {
    // Exposed to Lightning Web Components. cacheable=true lets the client
    // cache results and enables the reactive @wire adapter on the LWC side.
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchKey) {
        String key = '%' + (String.isBlank(searchKey) ? '' : searchKey) + '%';
        return [
            SELECT Id, Name, Industry, Phone
            FROM Account
            WHERE Name LIKE :key
            WITH USER_MODE
            ORDER BY Name
            LIMIT 200
        ];
    }
}
