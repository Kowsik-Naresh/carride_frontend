class User {
    constructor({
        userId = null,
        userName = '',
        mobileNumber = '',
        alternateNumber = '',
        email = '',
        address = '',
        profileImage = '',
        password = '',
        isActive = true,
        createdAt = new Date().toISOString(),
        modifiedAt = new Date().toISOString()
    } = {}) {
        this.userId = userId;
        this.userName = userName;
        this.mobileNumber = mobileNumber;
        this.alternateNumber = alternateNumber;
        this.email = email;
        this.address = address;
        this.profileImage = profileImage;
        this.password = password;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }

    // Getters
    getUserId() { return this.userId; }
    getUserName() { return this.userName; }
    getMobileNumber() { return this.mobileNumber; }
    getAlternateNumber() { return this.alternateNumber; }
    getEmail() { return this.email; }
    getAddress() { return this.address; }
    getProfileImage() { return this.profileImage; }
    getPassword() { return this.password; }
    getIsActive() { return this.isActive; }

    // Setters
    setUserId(value) { this.userId = value; }
    setUserName(value) { this.userName = value; }
    setMobileNumber(value) { this.mobileNumber = value; }
    setAlternateNumber(value) { this.alternateNumber = value; }
    setEmail(value) { this.email = value; }
    setAddress(value) { this.address = value; }
    setProfileImage(value) { this.profileImage = value; }
    setPassword(value) { this.password = value; }
    setIsActive(value) { this.isActive = value; }

    toJSON() {
        return {
            userId: this.userId,
            userName: this.userName,
            mobileNumber: this.mobileNumber,
            alternateNumber: this.alternateNumber,
            email: this.email,
            address: this.address,
            profileImage: this.profileImage,
            password: this.password,
            isActive: this.isActive
        };
    }
}

export default User;
