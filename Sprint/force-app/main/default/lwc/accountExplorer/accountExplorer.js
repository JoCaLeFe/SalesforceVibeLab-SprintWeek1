import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text', sortable: true },
    { label: 'Industry', fieldName: 'Industry', type: 'text', sortable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];

export default class AccountExplorer extends LightningElement {
    columns = COLUMNS;
    searchKey = '';
    accounts;
    error;
    isLoading = true;
    sortedBy = 'Name';
    sortDirection = 'asc';

    // Reactive: when searchKey changes, the Apex method re-runs automatically.
    @wire(getAccounts, { searchKey: '$searchKey' })
    wiredAccounts({ data, error }) {
        this.isLoading = false;
        if (data) {
            this.accounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    handleSearch(event) {
        this.isLoading = true;
        this.searchKey = event.target.value;
    }

    // Client-side column sort for the currently loaded records.
    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        const clone = [...(this.accounts || [])];
        clone.sort((a, b) => {
            const x = (a[fieldName] || '').toString().toLowerCase();
            const y = (b[fieldName] || '').toString().toLowerCase();
            let result = 0;
            if (x > y) result = 1;
            else if (x < y) result = -1;
            return sortDirection === 'asc' ? result : -result;
        });
        this.accounts = clone;
        this.sortedBy = fieldName;
        this.sortDirection = sortDirection;
    }

    get hasResults() {
        return !this.isLoading && this.accounts && this.accounts.length > 0;
    }

    get isEmpty() {
        return !this.isLoading && this.accounts && this.accounts.length === 0;
    }
}
